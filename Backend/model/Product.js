router.get('/:id/recommendations', getRecommendations);
router.get('/:id/comments', getComments);
router.post('/:id/comments', authMiddleware, addComment);