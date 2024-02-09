const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        var updatePostStub;
    
        beforeEach(() => {
            // Before every test case, set up the response object
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
    
        afterEach(() => {
            // Executed after each test case
            updatePostStub.restore();
        });
    
        it('should update an existing post', () => {
            // Arrange
            const updatedPost = {
                _id: '507asdghajsdhjgasd',
                title: 'Updated test post',
                content: 'Updated content',
                author: 'stswenguser',
                date: Date.now()
            };
        
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, updatedPost);
        
            req.params = { id: '507asdghajsdhjgasd' };
            req.body = {
                title: 'Updated test post',
                content: 'Updated content',
                author: 'stswenguser'
            };
        
            // Act
            PostController.update(req, res);
        
            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req.params.id, req.body);
            sinon.assert.calledWith(res.json, updatedPost); // Ensure that the response contains the updated post
        });
        
        afterEach(() => {
            // Restore the stub after each test
            updatePostStub.restore();
        });
    
        // Error scenario
        it('should return status 500 on server error', () => {
            // Arrange
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(error);
    
            // Act
            PostController.update(req, res);
    
            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req.params.id, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });


    describe('findPost', () => {
        var findPostStub;
        const postId = '507asdghajsdhjgasd';
        const foundPost = {
            _id: postId,
            title: 'Found test post',
            content: 'Found content',
            author: 'stswenguser',
            date: Date.now()
        };
    
        beforeEach(() => {
            // Before every test case, set up the response object
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
    
        afterEach(() => {
            // Executed after each test case
            findPostStub.restore();
        });
    
        it('should find and return the specified post', () => {
            // Arrange
            findPostStub = sinon.stub(PostModel, 'findPost').withArgs(postId).yields(null, foundPost);
    
            req.params = { id: postId };
    
            // Act
            PostController.findPost(req, res);
    
            // Assert
            sinon.assert.calledWith(PostModel.findPost, postId);
            sinon.assert.calledWith(res.json, foundPost); // Ensure that the response contains the found post
        });
    
        // Error scenario
        it('should return status 500 on server error', () => {
            // Arrange
            findPostStub = sinon.stub(PostModel, 'findPost').withArgs(postId).yields(error);
    
            req.params = { id: postId };
    
            // Act
            PostController.findPost(req, res);
    
            // Assert
            sinon.assert.calledWith(PostModel.findPost, postId);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
});
