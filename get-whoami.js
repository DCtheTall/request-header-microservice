function getWhoami(req, res) {
  const ipaddress = req.ip;
  const language = req.headers['accept-language'].split(';')[0].split(',')[0];
  const software = req.headers['user-agent'].split('(')[1].split(')')[0];
  res.json({
    ipaddress,
    language,
    software,
  });
}

module.exports = getWhoami;
