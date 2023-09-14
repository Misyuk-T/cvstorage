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
import { sliderValueToLanguageLevel } from "@/helpers/constants";

const getIntersectedTechnology = (id, technologies) => {
  return technologies.find((item) => item.id === +id);
};

const UserTechnologyStackField = ({
  control,
  setValue,
  errors,
  removeTechnologies,
  technologies,
  index,
  value,
  showSlider = false,
  skillsType,
  onSelect,
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
  const isClientSide = typeof window !== "undefined";

  const handleTechnologySelect = (selectedOption) => {
    setSelectedTechnology(selectedOption);
    setValue(
      `${skillsType}[${index}].technologyId`,
      selectedOption?.value.toString(),
    );
    onSelect(skillsType);
  };

  const handleDeleteTechnology = () => {
    removeTechnologies(index);
    setSelectedTechnology(null);
  };

  return (
    <FormControl
      id={`${skillsType}[${index}]`}
      isInvalid={errors?.technology?.[index]}
      width="31%"
    >
      <Flex gap={3}>
        <Stack w="100%" gap={1}>
          <Controller
            name={`${skillsType}[${index}].technologyId`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                instanceId="technologiesSelect"
                options={formattedOptions}
                value={selectedTechnology}
                onChange={(selectedOption) =>
                  handleTechnologySelect(selectedOption)
                }
                isClearable
                placeholder="Select skill"
                menuPortalTarget={isClientSide && document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 100 }),
                  option: (styles) => ({
                    ...styles,
                    cursor: "pointer",
                    fontSize: "14px",
                  }),
                  control: (styles) => ({
                    ...styles,
                    cursor: "pointer",
                    padding: 0,
                    fontSize: "14px",
                    minHeight: "32px",
                    height: "32px",
                  }),
                  valueContainer: (styles) => ({
                    ...styles,
                    minHeight: "32px",
                    height: "32px",
                    marginBottom: "4px",
                  }),
                  indicatorsContainer: (styles) => ({
                    ...styles,
                    minHeight: "32px",
                    height: "32px",
                  }),
                }}
              />
            )}
          />

          <Box>
            <Controller
              name={`${skillsType}[${index}].level`}
              control={control}
              defaultValue={45}
              render={({ field }) =>
                showSlider ? (
                  <Slider
                    {...field}
                    aria-label={`slider-ex-${index}`}
                    step={15}
                    onChange={(val) => field.onChange(val.toString())}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb
                      w={10}
                      h={5}
                      borderRadius={2}
                      fontSize="12px"
                      border="2px solid"
                      borderColor="blue.300"
                    >
                      {sliderValueToLanguageLevel[field.value]}
                    </SliderThumb>
                  </Slider>
                ) : (
                  <div />
                )
              }
            />
          </Box>
        </Stack>

        <IconButton
          size="sm"
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
