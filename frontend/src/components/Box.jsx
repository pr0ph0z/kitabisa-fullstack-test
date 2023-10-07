import { Card, Text } from "@mantine/core";
import PropTypes from "prop-types";

export default function Box(props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={500} size="xl" tt="uppercase">
        {props.code}
      </Text>

      <Text style={{ fontSize: "rem" }} fw={700}>
        {props.rate}
      </Text>
    </Card>
  );
}

Box.propTypes = {
  code: PropTypes.string,
  rate: PropTypes.number,
};
