import React, { useState } from "react";
import { Stack } from "@strapi/design-system/Stack";
import {
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
  FieldInput,
} from "@strapi/design-system/Field";
import {
  GridLayout,
  Flex,
  Grid,
  GridItem,
  Button,
  Box,
  Typography,
  JSONInput,
} from "@strapi/design-system";

export default class ImagesPluginInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.value ? JSON.parse(props.value) : [],
      imageOpen: false,
      selected: null,
      showImages: true,
    };
    this.openImage = this.openImage.bind(this);
    this.closeImage = this.closeImage.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   console.log("HERE", this.props.value);
  // }

  openImage(index) {
    // console.log("Open Image");
    this.setState({
      imageOpen: true,
      selected: this.state.list[index],
    });
  }

  closeImage() {
    // console.log("closeImage");
    this.setState({
      imageOpen: false,
      selected: null,
    });
  }

  toggleView() {
    console.log("toggleView");
    this.setState({
      showImages: !this.state.showImages,
    });
  }

  handleChange(value) {
    // console.log(value);
    if (this.isJson(value)) {
      this.props.onChange({
        target: {
          name: this.props.name,
          value: value,
          type: this.props.attribute.type,
        },
      });
      this.setState({
        list: value ? JSON.parse(value) : [],
      });
    }
  }

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  render() {
    // PROPS:
    // attribute,
    // description,
    // disabled,
    // error,
    // intlLabel,
    // labelAction,
    // name,
    // onChange,
    // required,
    // value,

    return (
      <Field
        name={this.props.name}
        id={this.props.name}
        // GenericInput calls formatMessage and returns a string for the error
        error={this.props.error}
        hint={this.props.description}
      >
        <Stack spacing={1}>
          <FieldLabel
            action={this.props.labelAction}
            required={this.props.required}
          >
            {this.props.intlLabel.defaultMessage}
          </FieldLabel>
          <Button
            type="button"
            variant="default"
            onClick={this.toggleView}
            title="Toggle View"
            fullWidth={true}
          >
            {this.state.showImages ? "Edit JSON" : "Display Images"}
          </Button>
          {this.state.showImages ? (
            <Grid
              gridCols={this.state.imageOpen && this.state.selected ? 2 : 1}
            >
              <GridItem>
                <Flex wrap="wrap" gap={5}>
                  {this.state.list?.length && typeof this.state.list == "object"
                    ? this.state.list?.map((item, i) => {
                        return (
                          <Box key={`box-${i}`} shadow="tableShadow" hasRadius>
                            <button
                              type="button"
                              onClick={() => this.openImage(i)}
                              title="Open image"
                              style={{ display: "block" }}
                            >
                              <img
                                src={item.url}
                                alt={item.caption}
                                style={{
                                  width: "150px",
                                  height: "auto",
                                  aspectRatio: 4 / 3,
                                  objectFit: "cover",
                                }}
                              />
                            </button>
                          </Box>
                        );
                      })
                    : ""}
                </Flex>
              </GridItem>
              {this.state.imageOpen && this.state.selected ? (
                <GridItem>
                  <img
                    src={this.state.selected.url}
                    alt={this.state.selected.caption}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                  <Typography
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      display: "block",
                    }}
                  >
                    {this.state.selected.caption}
                  </Typography>
                  <Button
                    type="button"
                    variant="default"
                    onClick={this.closeImage}
                    title="Close image"
                  >
                    Close
                  </Button>
                </GridItem>
              ) : (
                ""
              )}
            </Grid>
          ) : (
            <JSONInput value={this.props.value} onChange={this.handleChange} />
          )}
          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
    );
  }
}
