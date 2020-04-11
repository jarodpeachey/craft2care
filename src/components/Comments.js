import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createRef } from 'react';
import { formatDate } from '../utils/formatDate';
import Button from '@material-ui/core/Button';
import { Title } from '../blocks/title';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

const Comments = ({ comments }) => {
  const [state, setState] = React.useState({});
  const [parentCommentNumber, setParentCommentNumber] = React.useState(0);
  const [stateComments, setStateComments] = React.useState(comments);


  const apiKey = process.env.NETLIFY_TOKEN;
  const siteID = process.env.SITE_ID;

  const fetchNewComments = async () => {
    const newComments = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteID}/submissions/?access_token=${apiKey}`
    );

    return newComments;
  };

  useEffect(() => {
    const newComments = fetchNewComments().then((res) => {
      res.json().then((json) => {
        const insideNewComments = [];

        Object.values(json).forEach((submission) => {
          if (
            submission.data.path === window.location.pathname &&
            submission.data.name !== 'placeholder' &&
            submission.data.comment !== 'placeholder'
          ) {
            insideNewComments.push(submission);
          }
        });

        if (stateComments !== insideNewComments) {
          setStateComments(insideNewComments);
        }
      });
    });

    if (state.path !== window.location.pathname) {
      setState({ path: window.location.pathname });
    }
  }, []);


  // console.log(
  //   'First level comments: ',
  //   stateComments
  //     .filter((comment) =>
  //       comment.node
  //         ? comment.node.data.parentCommentNumber == 'undefined'
  //         : comment.data.parentCommentNumber == 'undefined'
  //     )
  //     .sort((a, b) =>
  //       a.node ? a.node.number - b.node.number : a.number - b.number
  //     )
  // );
  // console.log(
  //   'Replies: ',
  //   stateComments
  //     .filter((comment) =>
  //       comment.node
  //         ? comment.node.data.parentCommentNumber !== 'undefined'
  //         : comment.data.parentCommentNumber !== 'undefined'
  //     )
  //     .sort((a, b) =>
  //       a.node ? a.node.number - b.node.number : a.number - b.number
  //     )
  // );

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      path: state.path,
      parentCommentNumber: state.parentCommentNumber,
    });
  };
  // const [emailError, setEmailError] = useState(false);

  // const onEmailInputChange = (e) => {
  //   setEmail(e.target.value);

  //   const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  //   if (regex.test(e.target.value)) {
  //     setEmailError(false);
  //   } else {
  //     setEmailError(true);
  //   }
  // };

  const handleReplyOpen = (e) => {
    const number = e.target.getAttribute('number');
    setState({ ...state, parentCommentNumber: number });
    const newElement = document.createElement('div');

    newElement.innerHTML = `        <form
          class=${GrayForm.__linaria.className}
          name='Comments Awaiting Approval'
          method='post'
          id='form'
          // action='/thanks/'
          data-netlify='true'
          onSubmit={handleSubmit}
        >
          <input
            type='hidden'
            name='form-name'
            value='Comments Awaiting Approval'
          />
          <div class='row mobile-lg'>
            <div class='col col-6'>
              <label class=${HiddenLabel.__linaria.className} for='path'>Path</label>
              <input
                class=${HiddenInput.__linaria.className}
                name='path'
                id='path'
                type='text'
                value=${state.path}
              />
              <label class=${HiddenLabel.__linaria.className} for='parentCommentNumber'>Parent Comment Number</label>
              <input
                class=${HiddenInput.__linaria.className}
                name='parentCommentNumber'
                id='parentCommentNumber'
                type='text'
                value=${number}
              />
              <label class=${HiddenLabel.__linaria.className}  for='name'>Name</label>
              <input class=${Input.__linaria.className}
                onChange={handleChange}
                placeholder="Name"
                type='text'
                name='name'
                id='name'
              />
            </div>
            <div class='col col-6'>
              <label class=${HiddenLabel.__linaria.className}  for='email'>Email</label>
              <input class=${Input.__linaria.className}
                onChange={handleChange}
                type='email'
                name='email'
                id='email'
                placeholder="Email"
              />
            </div>
            <div class='col col-12'>
              <label class=${HiddenLabel.__linaria.className}  for='comment'>Comment</label>
              <textarea
                class=${TextArea.__linaria.className}
                onChange={handleChange}
                name='comment'
                id='comment'
                placeholder="Comment here..."
              ></textarea>
            </div>
            <div class='col col-12'>
              <button class='primary ${Button.__linaria.className}' type='submit'>
                Reply
              </button>
            </div>
          </div>
        </form>`;

    e.target.parentElement.appendChild(newElement);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('form');
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then((res) => console.log('Done: ', res))
      .catch((error) => alert(error));
  };

  return (
    <>
      <Column>
        <Title
          data={{
            title: 'Add A Comment',
            underline: false,
            center: false,
            type: 'h3',
          }}
        />
        <Card>
          <form
            name='Comments Awaiting Approval'
            method='post'
            id='form'
            // action='/thanks/'
            data-netlify='true'
            onSubmit={handleSubmit}
          >
            <input
              type='hidden'
              name='form-name'
              value='Comments Awaiting Approval'
            />
            <div className='row'>
              <div className='col col-6'>
                <HiddenLabel for='path'>Path</HiddenLabel>
                <HiddenInput
                  name='path'
                  id='path'
                  type='text'
                  value={state.path}
                />
                <HiddenLabel for='parentCommentNumber'>
                  Parent Comment Number
                </HiddenLabel>
                <HiddenInput
                  name='parentCommentNumber'
                  id='parentCommentNumber'
                  type='text'
                  value={0}
                />
                <HiddenInput
                  name='parentCommentNumber'
                  id='parentCommentNumber'
                  type='text'
                  value={state.parentCommentNumber}
                />
                <Label for='name'>Name</Label>
                <Input
                  onChange={handleChange}
                  type='text'
                  name='name'
                  id='name'
                />
              </div>
              <div className='col col-6'>
                <Label for='email'>Email</Label>
                <Input
                  onChange={handleChange}
                  type='email'
                  name='email'
                  id='email'
                />
              </div>
              <div className='col col-12'>
                <Label for='comment'>Comment</Label>
                <TextArea
                  onChange={handleChange}
                  name='comment'
                  id='comment'
                ></TextArea>
              </div>
              <div className='col col-12'>
                <Button variant='contained' color='primary' type='submit'>
                  Post your comment
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </Column>
      <Column>
      <Title
        data={{
          title: 'Comments',
          underline: false,
          center: false,
          type: 'h3',
        }}
      />
      <Card>
        {stateComments
          .filter((comment) =>
            comment.node
              ? comment.node.data.parentCommentNumber == 'undefined'
              : comment.data.parentCommentNumber == 'undefined'
          )
          .sort((a, b) =>
            a.node ? a.node.number - b.node.number : a.number - b.number
          ) && (
          <>
            <CommentsSection>
              {/* {typeof comments === 'array' ? ( */}
              {stateComments
                .filter((comment) =>
                  comment.node
                    ? comment.node.data.parentCommentNumber == 'undefined'
                    : comment.data.parentCommentNumber == 'undefined'
                )
                .sort((a, b) =>
                  a.node ? a.node.number - b.node.number : a.number - b.number
                )
                .map((parentComment) => {
                  if (
                    parentComment.node
                      ? parentComment.node.data.name !== 'placeholder'
                      : parentComment.data.name
                  ) {
                    return (
                      <Comment
                        key={
                          parentComment.node
                            ? parentComment.node.data.name
                            : parentComment.data.name
                        }
                      >
                        <CommentName>
                          {parentComment.node
                            ? parentComment.node.data.name
                            : parentComment.data.name}
                        </CommentName>
                        <CommentDate>
                          on{' '}
                          {parentComment.node
                            ? parentComment.node.created_at
                            : formatDate(parentComment.created_at)}
                        </CommentDate>
                        <p>
                          {parentComment.node
                            ? parentComment.node.data.comment
                            : parentComment.data.comment}
                        </p>
                        <CommentFooter>
                          <span
                            number={
                              parentComment.node
                                ? parentComment.node.number
                                : parentComment.number
                            }
                            name={`comment${
                              parentComment.node
                                ? parentComment.node.data.name
                                : parentComment.data.name
                            }`}
                            onClick={handleReplyOpen}
                          >
                            Reply
                          </span>
                        </CommentFooter>
                        {stateComments
                          .filter((comment) =>
                            comment.node
                              ? comment.node.data.parentCommentNumber !==
                                'undefined'
                              : comment.data.parentCommentNumber !== 'undefined'
                          )
                          .sort((a, b) =>
                            a.node
                              ? a.node.number - b.node.number
                              : a.number - b.number
                          )
                          .map((reply) => {
                            if (
                              reply.node
                                ? reply.node.data.parentCommentNumber ==
                                  parentComment.node.number
                                : reply.data.parentCommentNumber ==
                                  parentComment.number
                            ) {
                              return (
                                <GrayComment>
                                  <CommentName>
                                    {reply.node
                                      ? reply.node.data.name
                                      : reply.data.name}
                                  </CommentName>
                                  <CommentDate>
                                    on{' '}
                                    {reply.node
                                      ? reply.node.created_at
                                      : formatDate(reply.created_at)}
                                  </CommentDate>
                                  <p>
                                    {reply.node
                                      ? reply.node.data.comment
                                      : reply.data.comment}
                                  </p>
                                  <CommentFooter>
                                    <span
                                      number={
                                        parentComment.node
                                          ? parentComment.node.number
                                          : parentComment.number
                                      }
                                      name={`reply${
                                        reply.node
                                          ? reply.node.data.name
                                          : reply.data.name
                                      }`}
                                      onClick={handleReplyOpen}
                                    >
                                      Reply
                                    </span>
                                  </CommentFooter>
                                </GrayComment>
                              );
                            }

                            else {
    return null;
}
                          })}
                      </Comment>
                    );
                  }
                })}
              {/* ) : ( */}
              {/* <>
              {comments.data.name !== 'placeholder' ? (
                <Comment key={comments.data.name}>
                  <CommentName>{comments.data.name}</CommentName>
                  <CommentDate>on {comments.created_at}</CommentDate>
                  <p>{comments.data.comment}</p>
                  <CommentFooter>
                    <span
                      number={comments.number}
                      name={`comment${comments.data.name}`}
                      onClick={handleReplyOpen}
                    >
                      Reply
                    </span>
                  </CommentFooter>
                </Comment>
              ) : null}
            </> */}
              {/* )} */}
            </CommentsSection>
          </>
        )}
      </Card>
      </Column>
    </>
  );
};

const Column = styled.div`
  padding: 32px 0;
`;

const Card = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 2px 3px 5px 0px #e8e8e8;
  padding: 24px;
`;

const GrayForm = styled.form`
  background: #f7f7f7;
  padding: 16px;
  margin-top: 12px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  display: block;
  font-weight: 500;
`;

const Error = styled.small`
  display: block;
  margin-top: 8px;
  color: tomato;f
`;

const Input = styled.input`
  padding: 14px;
  background: #f7f7f7;
  border: 2px solid #f7f7f7;
  font-size: 16px;
  margin-bottom: 4px;
  outline: none;
  width: 100%;
  :focus {
    border: 2px solid ${(props) => props.theme.color.primary};
  }
`;

const GrayTextArea = styled.textarea`
  padding: 14px;
  background: #f7f7f7;
  border: 2px solid #f7f7f7;
  font-size: 16px;
  outline: none;
  width: 100%;
  resize: vertical;
  min-height: 100px;
  vertical-align: top;
  :focus {
    border: 2px solid ${(props) => props.theme.color.primary};
  }
`;

const GrayInput = styled.input`
  padding: 14px;
  background: #f7f7f7;
  border: 2px solid #f7f7f7;
  font-size: 16px;
  margin-bottom: 4px;
  outline: none;
  width: 100%;
  :focus {
    border: 2px solid ${(props) => props.theme.color.primary};
  }
`;

const HiddenLabel = styled.label`
  height: 0px !important;
  width: 0px !important;
  background: transparent !important;
  color: transparent !important;
  border: none !important;
  outline: none !important;
  cursor: default !important;
  padding: 0 !important;
  margin: 0 !important;
  max-height: 0px !important;
  min-height: 0px !important;
  display: float;
`;

const HiddenInput = styled.input`
  height: 0px !important;
  width: 0px !important;
  background: transparent !important;
  color: transparent !important;
  border: none !important;
  outline: none !important;
  cursor: default !important;
  padding: 0 !important;
  margin: 0 !important;
  max-height: 0px !important;
  min-height: 0px !important;
  display: float;
`;

const TextArea = styled.textarea`
  padding: 14px;
  background: #f7f7f7;
  border: 2px solid #f7f7f7;
  font-size: 16px;
  outline: none;
  width: 100%;
  resize: vertical;
  min-height: 100px;
  vertical-align: top;
  :focus {
    border: 2px solid ${(props) => props.theme.color.primary};
  }
`;

const CommentsSection = styled.div``;

const Comment = styled.div`
  padding: 14px;
  box-shadow: 1px 1px 3px 0px #e7e7e7;
  font-size: 16px;
  background: white;
  outline: none;
  width: 100%;
  margin: 12px 0;
`;

const GrayComment = styled.div`
  padding: 14px;
  // box-shadow: 1px 1px 3px 0px #e7e7e7;
  font-size: 16px;
  background: #f7f7f7;
  outline: none;
  width: 100%;
  margin: 12px 0;
  :last-child {
    margin-bottom: 0;
  }
`;

const CommentName = styled.h3`
  margin: 0;
`;

const CommentDate = styled.small`
  display: block;
  margin-bottom: 12px;
`;

const CommentFooter = styled.div`
  font-size: 14px;
  color: #666;
`;

export default Comments;
