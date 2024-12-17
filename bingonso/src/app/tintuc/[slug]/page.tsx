// app/tintuc/[slug]/page.tsx

import React from 'react';

// Hàm lấy dữ liệu bài viết từ API
const fetchPost = async (slug: string) => {
  const res = await fetch(`http://localhost:8080/api/tintuc/${slug}`, {
    cache: 'no-store', // Tắt cache để lấy dữ liệu mới nhất
  });

  if (!res.ok) {
    throw new Error('Không thể lấy dữ liệu bài viết');
  }
  return res.json();
};

// Component chi tiết bài viết
const PostDetail = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params; // Lấy slug từ params

  try {
    // Gọi API để lấy dữ liệu bài viết
    const post = await fetchPost(slug);

    return (
      <div>
        <h1 className='text-2xl font-bold'>{post.title}</h1>
        <h2 className='text-xl text-gray-500'>{post.sub_title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <p className='mt-4 text-sm text-gray-700'>Lượt xem: {post.views}</p>
      </div>
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Xử lý lỗi nếu không tìm thấy bài viết
    return (
      <div className='text-center mt-10'>
        <h1 className='text-xl font-semibold text-red-500'>Bài viết không tồn tại</h1>
        <p>Vui lòng kiểm tra lại đường dẫn.</p>
      </div>
    );
  }
};

export default PostDetail;
