function GET(req, res) {
  res.json({ text: 'root get' })
}

function OPTIONS(req, res) {
  res.json({ name: 'root options' })
}

function POST(req, res, url, payload) {
  res.json({ contentType: req.headers['content-type'], payload })
}

export { GET, OPTIONS, POST }
