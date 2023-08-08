import {
  Flex,
  FormControl,
  IconButton,
  Stack,
  Text,
  Img,
} from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";

const FileUploadField = ({ name, register, onChange, imagePreview, error }) => {
  const defaultImagePreviewPath = imagePreview
    ? imagePreview
    : "/default_avatar.png";
  const isInitialPath = imagePreview?.includes("public");
  const imagePreviewPath =
    imagePreview && isInitialPath
      ? `/${imagePreview.split("/").slice(1).join("/")}`
      : defaultImagePreviewPath;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    onChange(name, file);
  };

  console.log(imagePreviewPath, "imagePreviewPath");

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
          cursor="pointer"
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
              cursor="pointer"
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
              cursor="pointer"
            />
          )}
          <Img src={imagePreviewPath} alt="Preview" cursor="pointer" />
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
