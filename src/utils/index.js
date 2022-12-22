/* eslint-disable camelcase */
const mapDBToModel = ({ album_id, name, year }) => ({
  album_id,
  name,
  year,
});

const mapDBToModelSongs = ({ song_id, title, performer }) => ({
  id: song_id,
  title,
  performer,
});

const mapDBToModelSongBy = ({
  song_id,
  title,
  year,
  genre,
  performer,
  duration,
  id_album,
}) => ({
  id: song_id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: id_album,
});

module.exports = { mapDBToModel, mapDBToModelSongs, mapDBToModelSongBy };
