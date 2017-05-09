function getTimestamp(req, res) {
  if (false) {

  } else {
    res.status(422);
    res.render('error', {
      message: 'No date found in input.',
      error: {},
    });
  }
}

module.exports = { getTimestamp };
