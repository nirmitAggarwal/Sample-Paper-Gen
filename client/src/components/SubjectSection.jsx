import React, { useState } from 'react';

const SubjectSection = ({ subjectData, className }) => {
  const [images, setImages] = useState(subjectData.images);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const tags = prompt('Enter tags (comma separated)', '');
    const accessToken = localStorage.getItem('accessToken');

    if (file && tags && accessToken) {
      const repoName = `${className}-${subjectData.name}`;
      const tagList = tags.split(',').map(tag => tag.trim());
      try {
        // Step 1: Create a new repository
        let repoResponse = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            'Authorization': `token ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: repoName,
            private: false,
          }),
        });

        if (!repoResponse.ok) {
          // If repo already exists, fetch its details
          repoResponse = await fetch(`https://api.github.com/repos/${repoName}`, {
            headers: {
              'Authorization': `token ${accessToken}`,
            },
          });

          if (!repoResponse.ok) {
            throw new Error('Failed to create or access repository');
          }
        }

        const repoData = await repoResponse.json();

        // Step 2: Upload image to GitHub repository
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64Image = reader.result.split(',')[1];

          const createFileResponse = await fetch(
            `https://api.github.com/repos/${repoData.owner.login}/${repoName}/contents/${file.name}`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `token ${accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: 'Add image',
                content: base64Image,
              }),
            }
          );

          if (!createFileResponse.ok) {
            throw new Error('Failed to upload image');
          }

          const fileData = await createFileResponse.json();
          const imageUrl = fileData.content.download_url;

          // Notify the local server about the new image
          await fetch('http://localhost:3000/image_added', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageUrl,
              tags: tagList,
              className,
              subjectName: subjectData.name,
            }),
          });

          setImages([...images, { url: imageUrl, tags: tagList }]);
        };
      } catch (error) {
        console.error(error);
        alert('An error occurred while uploading the image');
      }
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg mb-2">{subjectData.name}</h3>
      <input type="file" onChange={handleImageUpload} />
      <ul>
        {images.map((image, index) => (
          <li key={index}>
            <a href={image.url} target="_blank" rel="noopener noreferrer">{image.url}</a>
            <p>Tags: {image.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectSection;
