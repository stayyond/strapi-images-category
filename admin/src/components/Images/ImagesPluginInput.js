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
      obj: props.value ? JSON.parse(props.value) : {},
      imageOpen: false,
      selected: null,
      showImages: true,
    };
    console.log("obj", this.state.obj);
    this.openImage = this.openImage.bind(this);
    this.closeImage = this.closeImage.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.copyObj = this.copyObj.bind(this);
  }

  // componentDidMount() {
  //   console.log("HERE", this.props.value);
  // }

  openImage(index, type) {
    // console.log("Open Image");
    let arr = this.state.obj[type];
    console.log("arr", arr);

    this.setState({
      imageOpen: true,
      selected: arr[index],
    });
  }

  closeImage() {
    // console.log("closeImage");
    this.setState({
      imageOpen: false,
      selected: null,
    });
  }

  async copyObj() {
    // console.log("closeImage");
    let text = JSON.stringify(this.state.selected);
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard:", text);
    } catch (error) {
      alert("Error copying to clipboard:", error);
    }
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
        obj: value ? JSON.parse(value) : [],
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
              gap={this.state.imageOpen && this.state.selected ? "10px" : "0px"}
            >
              <GridItem>
                {this.state.obj?.room && this.state.obj.room.length ? (
                  <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <FieldLabel style={{ marginBottom: "10px" }}>
                      Rooms
                    </FieldLabel>
                    <Flex gap={5} style={{ flexWrap: "wrap" }} wrap={true}>
                      {this.state.obj.room.map((item, i) => {
                        return (
                          <Box key={`box-${i}`} shadow="tableShadow" hasRadius>
                            <button
                              type="button"
                              onClick={() => this.openImage(i, "room")}
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
                      })}
                    </Flex>
                  </div>
                ) : (
                  ""
                )}
                {this.state.obj?.hotel && this.state.obj.hotel.length ? (
                  <div style={{ marginBottom: "20px" }}>
                    <FieldLabel style={{ marginBottom: "10px" }}>
                      Hotel
                    </FieldLabel>
                    <Flex gap={5} style={{ flexWrap: "wrap" }} wrap={true}>
                      {this.state.obj.hotel.map((item, i) => {
                        return (
                          <Box key={`box-${i}`} shadow="tableShadow" hasRadius>
                            <button
                              type="button"
                              onClick={() => this.openImage(i, "hotel")}
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
                      })}
                    </Flex>
                  </div>
                ) : (
                  ""
                )}
                {this.state.obj?.general && this.state.obj.general.length ? (
                  <div style={{ marginBottom: "20px" }}>
                    <FieldLabel style={{ marginBottom: "10px" }}>
                      General
                    </FieldLabel>
                    <Flex gap={5} style={{ flexWrap: "wrap" }} wrap={true}>
                      {this.state.obj.general.map((item, i) => {
                        return (
                          <Box key={`box-${i}`} shadow="tableShadow" hasRadius>
                            <button
                              type="button"
                              onClick={() => this.openImage(i, "general")}
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
                      })}
                    </Flex>
                  </div>
                ) : (
                  ""
                )}
                {this.state.obj?.service && this.state.obj.service.length ? (
                  <div style={{ marginBottom: "20px" }}>
                    <FieldLabel style={{ marginBottom: "10px" }}>
                      Service
                    </FieldLabel>
                    <Flex gap={5} style={{ flexWrap: "wrap" }} wrap={true}>
                      {this.state.obj.service.map((item, i) => {
                        return (
                          <Box key={`box-${i}`} shadow="tableShadow" hasRadius>
                            <button
                              type="button"
                              onClick={() => this.openImage(i, "service")}
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
                      })}
                    </Flex>
                  </div>
                ) : (
                  ""
                )}
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
                  <Flex gap={5}>
                    <Box>
                      <Button
                        type="button"
                        variant="default"
                        onClick={this.copyObj}
                        title="Copy image obj"
                      >
                        Copy
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        type="button"
                        variant="default"
                        onClick={this.closeImage}
                        title="Close image"
                      >
                        Close
                      </Button>
                    </Box>
                  </Flex>
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
