const {
  addAlbumsHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/albums",
    handler: addAlbumsHandler,
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: getAlbumByIdHandler,
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: editAlbumByIdHandler,
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: deleteAlbumByIdHandler,
  },
];

module.exports = routes;