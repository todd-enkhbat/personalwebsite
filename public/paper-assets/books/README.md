# Book covers

The smaller shelf's covers were fetched from [Open Library Covers](https://openlibrary.org/dev/docs/api/covers). The four featured books use these edition images:

- `dispossessed-featured.jpg`: [Ursula K. Le Guin's official site](https://www.ursulakleguin.com/novels-and-collections), 50th anniversary edition.
- `nomos-of-the-earth.jpg`: [Open Library Covers](https://openlibrary.org/dev/docs/api/covers), ISBN 9780914386308.
- `human-condition-featured.jpg`: [University of Chicago Press](https://press.uchicago.edu/ucp/books/book/chicago/H/bo29137972.html), 60th anniversary edition.
- `time-and-chance-featured.jpg`: [ThriftBooks](https://www.thriftbooks.com/w/time-and-chance_david-z-albert/1782431/), illustrated Harvard University Press edition.

- `index.json` maps the original Columbia reading list to local cover paths.

To refresh:

```bash
# example ISBN fetch
curl -L "https://covers.openlibrary.org/b/isbn/9780872201361-L.jpg" -o republic.jpg
```

- `on-liberty-penguin.png`: replacement Penguin Classics cover supplied by the site owner (On Liberty and The Subjection of Women).
