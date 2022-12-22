/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const { mapDBToModel, mapDBToModelSongs } = require("../../utils");
const NotFoundError = require("../../exceptions/NotFoundError");

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const album_id = nanoid(16);

    const query = {
      text: "INSERT INTO albums VALUES($1, $2, $3) RETURNING album_id",
      values: [album_id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].album_id) {
      throw new InvariantError("Album gagal ditambahkan");
    }
    return result.rows[0].album_id;
  }

  async getAlbumById(album_id) {
    const query = {
      text: "SELECT * FROM albums WHERE album_id = $1",
      values: [album_id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("Album tidak ditemukan");
    }
    // return result.rows.map(mapDBToModel)[0];
    return mapDBToModel(result.rows[0]);
  }

  async editAlbumById(album_id, { name, year }) {
    const query = {
      text: "UPDATE albums SET name = $1, year = $2 WHERE album_id = $3 RETURNING album_id",
      values: [name, year, album_id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("Gagal memperbarui Album. Id tidak ditemukan");
    }
  }

  async deleteAlbumById(album_id) {
    const query = {
      text: "DELETE FROM albums WHERE album_id = $1 RETURNING album_id",
      values: [album_id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("Album gagal dihapus. Id tidak ditemukan");
    }
  }

  async getSongByAlbum(album_id) {
    const query = {
      text: "SELECT * FROM songs WHERE id_album = $1",
      values: [album_id],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapDBToModelSongs);
  }
}

module.exports = AlbumsService;
