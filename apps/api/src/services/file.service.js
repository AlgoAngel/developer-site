const { cloudinary } = require("../cloudinary");

class FileService {
  create(fileName,callback) {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options= { 
      folder: "davc93",
      overwrite:true,
      public_id:fileName
    }
    return cloudinary.uploader.upload_stream(options, callback);
  }

  async findAll() {
    const images = await models.Image.findAll();
    return images;
  }

  async findOne(id) {
    const image = await models.Image.findByPk(id);
    if (!image) {
      throw new Error("Image doesn't exist");
    }
    return image;
  }

  async update(id, changes) {
    const image = await this.findOne(id);
    const rta = await image.update(changes);
    return rta;
  }

  async delete(id) {
    const image = await this.findOne(id);
    await image.destroy();
    return { id };
  }
}

module.exports = { FileService };
