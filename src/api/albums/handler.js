class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // this.postAlbumHandler = this.postAlbumHandler.bind(this);
    // this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    // this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    // this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name = "untitled", year } = request.payload;
    const albumId = this._service.addAlbum({ name, year });

    const response = h.response({
      status: "success",
      message: "Album berhasil ditambahkan",
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = this._service.getAlbumById(id);
    return {
      status: "success",
      data: {
        album: {
          id: album.album_id,
          name: album.name,
          year: album.year,
        },
      },
    };
  }

  putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    this._service.editAlbumById(id, request.payload);

    return {
      status: "success",
      message: "Album berhasil diperbarui",
    };
  }

  deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    this._service.deleteAlbumById(id);
    return {
      status: "success",
      message: "Album berhasil dihapus",
    };
  }
}

module.exports = AlbumsHandler;
