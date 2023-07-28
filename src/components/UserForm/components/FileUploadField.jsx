import NextImage from "next/image";

import { Flex, FormControl, IconButton, Stack, Text } from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";

import DefaultAvatar from "public/default_avatar.png";

const FileUploadField = ({ name, register, onChange, imagePreview, error }) => {
  const defaultImagePreviewPath = imagePreview ? imagePreview : DefaultAvatar;
  const imagePreviewPath =
    imagePreview && imagePreview.includes("public")
      ? `/${imagePreview.split("\\").slice(1).join("/")}`
      : defaultImagePreviewPath;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    onChange(name, file);
  };

  const handleClearFile = () => {
    onChange(name, null);
  };

  return (
    <FormControl w="auto">
      <Stack align="center" gap={2}>
        <Flex
          alignItems="center"
          width="150px"
          height="150px"
          position="relative"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.400"
          borderRadius={5}
        >
          {imagePreview ? (
            <IconButton
              position="absolute"
              top="5px"
              right="5px"
              icon={<DeleteIcon />}
              onClick={handleClearFile}
              colorScheme="red"
              size="xs"
              aria-label="delete avatar"
              zIndex={2}
            >
              Remove Image
            </IconButton>
          ) : (
            <DownloadIcon
              w={10}
              h={10}
              position="absolute"
              top="45px"
              left="55px"
              opacity={0.7}
            />
          )}
          <NextImage
            width={150}
            height={150}
            src={imagePreviewPath}
            alt="Preview"
          />
          <input
            {...register(name)}
            type="file"
            accept="image/*"
            id={name}
            onChange={handleFileChange}
            style={{
              marginLeft: "10px",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0,
              cursor: "pointer",
            }}
          />
        </Flex>

        {error?.media && (
          <Text fontSize="sm" color="red">
            {error?.media.message}
          </Text>
        )}
      </Stack>
    </FormControl>
  );
};

export default FileUploadField;
