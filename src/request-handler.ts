import { blogsHandler } from './blog-router';
import { commentsHandler } from './comment-router';

const blogRegex = /^\/blogs(|\/(?<blog>[0-9]+))$/;
const commentRegex = /^\/blogs\/(?<blog>[0-9]+)((\/comments)|(\/comments\/(?<comment>[0-9]+)))$/;

async function responseHandler(url: string, method: string, data: any) {
  if (!checkURL(url))
    return {
      status: 400,
      message: 'Requested URL is incorrect',
    };

  if (blogRegex.test(url)) return blogsHandler(url, method, data);

  if (commentRegex.test(url)) return commentsHandler(url, method, data);
}

function checkURL(url: string) {
  return blogRegex.test(url) || commentRegex.test(url);
}

export { blogRegex, commentRegex, responseHandler };
