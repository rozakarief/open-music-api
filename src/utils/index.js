const mapDBToModel = ({ album_id, name, year }) => ({
  album_id,
  name,
  year,
});

module.exports = { mapDBToModel };
