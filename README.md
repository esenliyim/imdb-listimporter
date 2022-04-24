# imdb-listimporter

Axios-based IMDb list importer for node.
## About

The `imdb-listimporter` package allows you to import the contents of publicly visible user lists from IMDb.

## Features 

- Import user Watchlists by providing either a URL to the user profile, or just the user ID.

- Import user lists by providing either a URL to the list, or just the list ID

- Import data as either a 2D array of strings, or parsed into Film objects

- Can specify which fields to include or exclude

Of course the lists must be set to be publicly visible. I'm not a magician.

Can take up to several seconds, especially if the input is a user profile or ID, because IMDb response times tend to be long

---

Soon on npm.