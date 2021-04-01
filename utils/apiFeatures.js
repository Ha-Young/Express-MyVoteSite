class APIFeatures {
  constructor(query, queryString = {}) {
    this.query = query;
    this.queryString = queryString;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query.sort(sortBy);
    } else {
      this.query.sort("-isInProgress -createdAt");
    }

    return this;
  }
}

module.exports = APIFeatures;
