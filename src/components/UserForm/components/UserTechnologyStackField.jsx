import { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

import {
  FormControl,
  Flex,
  Stack,
  IconButton,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { transformTechnologiesToSelect } from "@/helpers/transformData";

const getIntersectedTechnology = (id, technologies) => {
  return technologies.find((item) => item.id === +id);
};

const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
};

const UserTechnologyStackField = ({
  control,
  setValue,
  errors,
  removeTechnologies,
  technologies,
  index,
  value,
}) => {
  const initialTechnology = getIntersectedTechnology(
    value.technologyId,
    technologies,
  );
  const formattedData = initialTechnology && {
    label: initialTechnology.name,
    value: initialTechnology.id.toString(),
  };
  const [selectedTechnology, setSelectedTechnology] = useState(formattedData);

  const formattedOptions = transformTechnologiesToSelect(technologies);

  const handleTechnologySelect = (selectedOption) => {
    setSelectedTechnology(selectedOption);
    setValue(
      `technologyStack[${index}].technologyId`,
      selectedOption?.value.toString(),
    );
  };

  const handleDeleteTechnology = () => {
    removeTechnologies(index);
    setSelectedTechnology(null);
  };

  return (
    <FormControl
      id={`technologyStack[${index}]`}
      isInvalid={errors?.technology?.[index]}
      mb={4}
    >
      <Flex gap={3}>
        <Stack w="100%" gap={3}>
          <Controller
            name={`technologyStack[${index}].technologyId`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                options={formattedOptions}
                value={selectedTechnology}
                onChange={(selectedOption) =>
                  handleTechnologySelect(selectedOption)
                }
                isClearable
                placeholder="Select a technology"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 100 }) }}
              />
            )}
          />

          <Box>
            <Controller
              name={`technologyStack[${index}].level`}
              control={control}
              defaultValue={50}
              render={({ field }) => (
                <Slider
                  {...field}
                  aria-label={`slider-ex-${index}`}
                  step={10}
                  onChange={(val) => field.onChange(val.toString())}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    w={12}
                    h={6}
                    borderRadius={2}
                    border="2px solid"
                    borderColor="blue.300"
                  >
                    {field.value}%
                  </SliderThumb>
                </Slider>
              )}
            />
          </Box>
        </Stack>

        <IconButton
          colorScheme="red"
          flexShrink={0}
          onClick={handleDeleteTechnology}
          icon={<DeleteIcon />}
          aria-label="delete"
        />
      </Flex>

      {errors?.technologyStack && (
        <Text fontSize="sm" color="red">
          {errors?.technologyStack[index].message}
        </Text>
      )}
    </FormControl>
  );
};

export default UserTechnologyStackField;
