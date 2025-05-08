package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-chi/chi/v5"
)

// Define an envelope type.
type envelope map[string]interface{}

// readIDParam reads interpolated "id" from request URL and returns it and nil. If there is an error
// it returns and 0 and an error.
func ReadIDParam(r *http.Request) (int64, error) {
	idParam := chi.URLParam(r, "id")

	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil || id < 1 {
		return 0, errors.New("invalid id parameter")
	}

	return id, nil
}

// writeJSON marshals data structure to encoded JSON response. It returns an error if there are
// any issues, else error is nil.
func (app *application) writeJSON(w http.ResponseWriter, status int, data envelope, headers http.Header) error {

	// Use the json.MarshalIndent() function so that whitespace is added to the encoded JSON. Use
	// no line prefix and tab indents for each element.
	js, err := json.MarshalIndent(data, "", "\t")
	if err != nil {
		return err
	}

	// append a new line to make it easer to view in terminal application
	js = append(js, '\n')

	for key, value := range headers {
		w.Header()[key] = value
	}

	// Add the "Content-Type: application/json" header, then write the status code and JSON response.
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if _, err := w.Write(js); err != nil {
		app.logger.PrintError(err, nil)
		return err
	}

	return nil
}

// readJSON decodes request Body into corresponding Go type. It triages for any potential errors
// and returns corresponding appropriate errors.
func (app *application) readJSON(w http.ResponseWriter, r *http.Request, dst interface{}) error {
	// limiting the request body for preventing potential nefarious DoS atack.
	maxBytes := 1_048_576
	r.Body = http.MaxBytesReader(w, r.Body, int64(maxBytes))

	// Initialize the json.Decoder, and call the DisallowUnknownFields() method on it
	// before decoding. So, if the JSON from the client includes any field which
	// cannot be mapped to the target destination, the decoder will return an error
	// instead of just ignoring the field.
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	// Decode the request body to the destination.
	err := dec.Decode(dst)
	if err != nil {
		// If there is an error during decoding, start the error triage...
		var syntaxError *json.SyntaxError
		var unmarshalTypeError *json.UnmarshalTypeError
		var invalidUnmarshalError *json.InvalidUnmarshalError

		switch {
		// Use the error.As() function to check whether the error has the type *json.SyntaxError.
		case errors.As(err, &syntaxError):
			return fmt.Errorf("body contains badly-formed JSON at (character %d)", syntaxError.Offset)

		// Likewise, catch any *json.UnmarshalTypeError errors.
		case errors.As(err, &unmarshalTypeError):
			if unmarshalTypeError.Field != "" {
				return fmt.Errorf("body contains incorrect JSON type for field %q", unmarshalTypeError.Field)
			}
			return fmt.Errorf("body contains incorrect JSON type (at character %d)", unmarshalTypeError.Offset)
			// An io.EOF error will be returned by Decode() if the request body is empty. We check
			// for this with errors.Is() and return a plain-english error message instead.
		case errors.Is(err, io.EOF):
			return errors.New("body must not be empty")
		// If the JSON contains a field which cannot be mapped to the target destination
		// then Decode() will now return an error message in the format "json: unknown
		// field "<name>"". We check for this, extract the field name from the error,
		// and interpolate it into our custom error message.
		case strings.HasPrefix(err.Error(), "json: unknown field "):
			fieldName := strings.TrimPrefix(err.Error(), "json: unknown field ")
			return fmt.Errorf("body contains unknown key %s", fieldName)

		// If the request body exceeds 1MB in size then decode will now fail with the
		// error "http: request body too large". There is an open issue about turning
		case err.Error() == "http: request body too large":
			return fmt.Errorf("body must not be larger than %d bytes", maxBytes)
		// A json.InvalidUnmarshalError error will be returned if we pass a non-nil
		// pointer to Decode(). We catch this and panic, rather than returning an error
		// to our handler. At the end of this chapter
		case errors.As(err, &invalidUnmarshalError):
			panic(err)
		default:
			return err
		}
	}
	err = dec.Decode(&struct{}{})
	if err != io.EOF {
		return errors.New("body must only contain a single JSON value")
	}
	return nil

}

// background is a helper that accepts an arbitrary function as a parameter and runs it in a
// in goroutine in the background.
func (app *application) background(fn func()) {
	// Increment the Waitgroup counter
	app.wg.Add(1)

	go func() {
		// Use defer to decrement the WaitGroup counter before the goroutine returns.
		defer app.wg.Done()

		// Recover from any panic
		defer func() {

			if err := recover(); err != nil {
				app.logger.PrintError(fmt.Errorf("%s", err), nil)
			}
		}()
		// Execute the arbitrary function that we passed as the parameter
		fn()

	}()
}
