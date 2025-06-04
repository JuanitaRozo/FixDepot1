const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const comment = new Comment({
      userId: req.user.id,
      productId: req.params.id,
      comment: req.body.comment,
      rating: req.body.rating
    });
    await comment.save();
    res.json({ message: 'Comentario guardado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar comentario' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ productId: req.params.id }).populate('userId', 'name');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};