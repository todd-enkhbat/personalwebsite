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

Verified corrections for the expanded book view:

- `groundwork-kant.jpg`: the existing Kant *Foundations of the Metaphysics of Morals* cover, reassigned to its matching work, *Groundwork*, rather than *What is Enlightenment?*.
- `discourse-on-method-penguin.jpg`: [Penguin Random House](https://penguinrandomhousehighereducation.com/book/?isbn=9780140446999), ISBN 9780140446999.
- `genealogy-of-morals-penguin.jpg`: [Penguin Random House](https://www.penguinrandomhouse.com/books/315382/on-the-genealogy-of-morals-by-friedrich-nietzsche/), ISBN 9780141195377.
- `what-is-enlightenment-penguin.jpg`: [Penguin](https://www.penguin.co.uk/books/175584/an-answer-to-the-question-what-is-enlightenment-by-immanuel-kant/9780141043883), ISBN 9780141043883.

The original cover files are retained. `index.json` records the current mappings; `manifest.json` is the historical download log.

- `nomos-publisher.jpg`: sharper original artwork from the [Telos Press publisher store](https://www.telospress.com/store/-p17898060), replacing the smaller Open Library copy.
