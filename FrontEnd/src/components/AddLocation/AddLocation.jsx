import React from "react";
import "./AddLocation.css";
import { useForm } from "@mantine/form";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";
import { validateString } from "../../utils/common";

const AddLocation = ({ nextStep, propertyDetails, setPropertyDetails }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit = () => {
    const { hasError } = form.validate();
    if (!hasError) {
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      nextStep();
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(), handleSubmit();
      }}
    >
      {/* left side  */}
      <div className="addLocation-container">
        {/* inpuths  */}
        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>
        {/* right Side  */}

        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
