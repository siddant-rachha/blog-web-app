'use client';
import {
  BlogNavContainer,
  BlogList,
  BlogPage,
  BlogForm,
} from '@siddant-rachha/blog-components';
import { Box } from '@mui/material';
import {
  avatarItems,
  blogPost,
  blogPosts,
  navItems,
  searchItems,
} from '@/mocks/mocks';

export default function Page() {
  const handleNavItem = (item: string) => {
    console.log(item);
  };
  const handleAvatarItem = (item: string) => {
    console.log(item);
  };
  const handleSearchItem = (item: string) => {
    console.log(item);
  };

  const handleSearchInput = (item: string) => {
    console.log(item);
  };

  const handleFormSubmit = (formData: {
    name: string;
    title: string;
    desc: string;
  }) => {
    console.log(formData);
  };

  const handleBlogAction = (action: string) => {
    console.log(action);
  };

  const handleCardAction = ({ id, action }: { id: string; action: string }) => {
    console.log(id, action);
  };

  const handleFilterSelect = ({
    type,
    item,
  }: {
    type: string;
    item: string;
  }) => {
    console.log(type, item);
  };

  return (
    <>
      <Box>
        <BlogNavContainer
          logoSrc="/default-logo.png"
          avatarSrc="https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          navItems={navItems}
          navActive={navItems[0]}
          avatarItems={avatarItems}
          searchItems={searchItems}
          handleNavItem={handleNavItem}
          handleAvatarItem={handleAvatarItem}
          handleSearchItem={handleSearchItem}
          handleSearchInput={handleSearchInput}
        >
          <h1>These are Module components</h1>

          <BlogList
            blogPosts={blogPosts}
            blogFilter={['Oldest', 'Newest', 'My Posts']}
            blogPerPage="6"
            paginationFilter={['6', '12', '24']}
            handleFilterSelect={handleFilterSelect}
            handleCardAction={handleCardAction}
          />

          <BlogPage blogPost={blogPost} handleBlogAction={handleBlogAction} />

          <BlogForm
            name="sid"
            title="i am title"
            desc="i am desc"
            handleFormSubmit={handleFormSubmit}
          />
        </BlogNavContainer>
      </Box>
    </>
  );
}
