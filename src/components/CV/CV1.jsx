import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";

import { styles } from "./styles";

const splitArrayByType = (inputArray) => {
  const result = {
    hardSkill: [],
    softSkill: [],
    otherTypes: {},
  };

  inputArray.forEach((item) => {
    if (item.type === "hardSkill" || item.type === "softSkill") {
      result[item.type].push(item);
    } else {
      result.otherTypes[item.type] = result.otherTypes[item.type] || [];
      result.otherTypes[item.type].push(item);
    }
  });

  return result;
};

const CV1 = ({ user, technologies, projects }) => {
  const formattedMedia = user.media.replace("public", "");
  const groupedTechnologies = splitArrayByType(technologies);
  const technologyCore = Object.entries(groupedTechnologies.otherTypes);

  const renderSkillLevel = (skillsArray) => {
    const type = skillsArray[0]?.type;
    const typeTitle =
      type === "hardSkill"
        ? "Technology Core"
        : type === "language"
        ? "Languages"
        : type;

    return (
      <>
        <Text style={{ ...styles.textTitle, marginBottom: 5 }}>
          {typeTitle}
        </Text>
        <View
          style={{
            ...styles.flex,
            flexWrap: "wrap",
            gap: 10,
            marginBottom: -8,
          }}
        >
          {skillsArray.map((item) => (
            <View key={item.id} style={{ width: "30%", marginBottom: 8 }}>
              <Text style={{ ...styles.textSmall, color: "#ededed" }}>
                {item.name}
              </Text>
              <View
                style={{
                  marginTop: 2,
                  backgroundColor: "#ededed",
                  height: 5,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: `${item.level}%`,
                    height: "100%",
                    backgroundColor: "#FF6700",
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </>
    );
  };

  return (
    <Document title={user.name}>
      <Page size="A4" style={styles.page}>
        <View style={{ ...styles.flex }}>
          <View
            style={{
              ...styles.firstItem,
              height: 20,
              marginTop: 0,
              marginBottom: -1,
            }}
          />
        </View>

        <View style={{ ...styles.header }}>
          <View style={{ ...styles.stack, gap: 5 }}>
            <Text
              style={{
                ...styles.textBold,
                fontSize: 24,
                color: "white",
                textTransform: "uppercase",
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "white",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              {user.position}
            </Text>
          </View>

          <View style={{ ...styles.imageContainer }}>
            <Image
              style={{ ...styles.image }}
              src={formattedMedia}
              alt="avatar"
            />
          </View>
        </View>

        <View style={{ ...styles.flex }}>
          <View style={{ ...styles.firstItem, paddingTop: 21 }}>
            {user.email || user.socials.length > 0 ? (
              <>
                <Text style={{ ...styles.textTitle, marginBottom: 5 }}>
                  Contact Information
                </Text>
                <View style={{ ...styles.stack, gap: 2 }}>
                  {user.socials &&
                    user.socials.map(({ platform, url }) => (
                      <Text
                        key={url}
                        style={{ ...styles.textSmall, color: "#ededed" }}
                      >
                        {url}
                      </Text>
                    ))}
                  {user.email && (
                    <Text
                      style={{
                        ...styles.textSmall,
                        color: "#ededed",
                        marginTop: 2,
                      }}
                    >
                      {user.email}
                    </Text>
                  )}
                  <View style={{ ...styles.firstDivider }} />
                </View>
              </>
            ) : null}

            <View style={{ ...styles.stack }}>
              {groupedTechnologies.hardSkill &&
                renderSkillLevel(groupedTechnologies.hardSkill)}

              {technologyCore.map(([type, typeGroup]) => (
                <View key={type}>
                  <View style={{ ...styles.firstDivider }} />
                  {renderSkillLevel(typeGroup)}
                </View>
              ))}

              {groupedTechnologies.softSkill && (
                <>
                  <View style={{ ...styles.firstDivider }} />
                  <View style={{ ...styles.stack }}>
                    <Text style={{ ...styles.textTitle, marginBottom: 5 }}>
                      Soft Skills
                    </Text>
                    <View
                      style={{ ...styles.stack, flexWrap: "wrap", gap: 10 }}
                    >
                      {groupedTechnologies.softSkill.map((technology) => (
                        <View
                          key={technology.id}
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              ...styles.textSmall,
                              color: "#ededed",
                              marginRight: 8,
                            }}
                          >
                            •
                          </Text>
                          <Text
                            style={{ ...styles.textSmall, color: "#ededed" }}
                          >
                            {technology.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>

          <View style={{ ...styles.secondItem, padding: "10px 10px 0 15px" }}>
            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  ...styles.flex,
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      ...styles.textTitle,
                      marginBottom: 5,
                      color: "#091543",
                    }}
                  >
                    About me
                  </Text>
                </View>
                <View style={{ ...styles.extraLine }} />
              </View>
              <View>
                <Text
                  style={{
                    ...styles.textSmall,
                    color: "#091543",
                    lineHeight: 1.3,
                  }}
                >
                  {`       ${user.description}`}
                </Text>
              </View>
            </View>

            {user.education && (
              <View style={{ marginBottom: 20 }}>
                <View
                  style={{
                    ...styles.flex,
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        ...styles.textTitle,
                        marginBottom: 5,
                        color: "#091543",
                      }}
                    >
                      Education
                    </Text>
                  </View>
                  <View style={{ ...styles.extraLine }} />
                </View>
                <View style={{ ...styles.flex, flexWrap: "wrap", gap: 10 }}>
                  {user.education.map((item) => (
                    <View key={item.rank}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              ...styles.textSmall,
                              color: "#091543",
                              marginRight: 8,
                              fontWeight: 600,
                              opacity: 0.9,
                            }}
                          >
                            •
                          </Text>
                          <Text
                            style={{
                              ...styles.textSmall,
                              color: "#091543",
                              fontWeight: 600,
                              opacity: 0.9,
                              fontSize: 11,
                            }}
                          >
                            {item.rank}
                          </Text>
                        </View>
                        <Text
                          style={{
                            ...styles.textSmall,
                            color: "#091543",
                            fontWeight: 600,
                            opacity: 0.9,
                            fontSize: 11,
                          }}
                        >
                          {item.timePeriod}
                        </Text>
                      </View>
                      <Text
                        style={{
                          ...styles.textSmall,
                          color: "#091543",
                          opacity: 0.8,
                          marginTop: 3,
                          marginLeft: 8,
                        }}
                      >
                        {`       ${item.description}`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {user.experience && (
              <View style={{ marginBottom: 20 }}>
                <View
                  style={{
                    ...styles.flex,
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        ...styles.textTitle,
                        marginBottom: 5,
                        color: "#091543",
                        marginRight: 35,
                      }}
                    >
                      Work Experience
                    </Text>
                  </View>
                  <View style={{ ...styles.extraLine }} />
                </View>
                <View style={{ ...styles.flex, flexWrap: "wrap", gap: 10 }}>
                  {user.experience.map((item) => (
                    <View key={item.companyName}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              ...styles.textSmall,
                              color: "#091543",
                              marginRight: 8,
                              fontWeight: 600,
                              opacity: 0.9,
                            }}
                          >
                            •
                          </Text>
                          <Text
                            style={{
                              ...styles.textSmall,
                              color: "#091543",
                              fontWeight: 600,
                              opacity: 0.9,
                              fontSize: 11,
                            }}
                          >
                            {item.companyName}
                          </Text>
                        </View>
                        <Text
                          style={{
                            ...styles.textSmall,
                            color: "#091543",
                            fontWeight: 600,
                            opacity: 0.9,
                            fontSize: 11,
                          }}
                        >
                          {item.timePeriod}
                        </Text>
                      </View>
                      <Text
                        style={{
                          ...styles.textSmall,
                          color: "#091543",
                          opacity: 0.8,
                          marginTop: 3,
                          marginLeft: 8,
                        }}
                      >
                        {`       ${item.description}`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  ...styles.flex,
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      ...styles.textTitle,
                      marginBottom: 5,
                      color: "#091543",
                      marginRight: 20,
                    }}
                  >
                    Achievements
                  </Text>
                </View>
                <View style={{ ...styles.extraLine }} />
              </View>
              <View>
                <Text
                  style={{
                    ...styles.textSmall,
                    color: "#091543",
                    lineHeight: 1.3,
                  }}
                >
                  {`       ${user.motivation}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              ...styles.flex,
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#091543",
                  fontWeight: 600,
                  fontSize: 24,
                  marginLeft: 15,
                  marginBottom: 20,
                  marginTop: 10,
                  textTransform: "capitalize",
                }}
              >
                PROJECTS
              </Text>
            </View>
            <View
              style={{
                ...styles.extraLine,
                position: "relative",
                marginLeft: 35,
                height: 2,
                top: -5,
              }}
            />
          </View>
          <View>
            {projects.map((project) => (
              <View
                key={project.id}
                wrap={false}
                style={{
                  ...styles.stack,
                  marginBottom: 15,
                  padding: 20,
                  borderRadius: 5,
                  backgroundColor: "#dedede",
                  gap: 5,
                }}
              >
                {project.nda === 1 ? (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    * This project is under NDA
                  </Text>
                ) : (
                  <Text
                    style={{
                      ...styles.textBold,
                      color: "#091543",
                      fontSize: 16,
                    }}
                  >
                    {project.projectName}
                  </Text>
                )}

                <View>
                  <Text
                    style={{
                      ...styles.textSmall,
                      color: "#091543",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.description}
                  </Text>
                </View>
                <View>
                  <Text style={{ ...styles.textSmall, color: "#091543" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 11,
                      }}
                    >
                      Project Technology:{" "}
                    </Text>
                    {project.technologyStack.map((techName, index) => (
                      <Text key={index}>
                        {techName}
                        {index !== project.technologyStack.length - 1
                          ? ", "
                          : ""}
                      </Text>
                    ))}
                  </Text>
                </View>
                <Text
                  style={{
                    ...styles.textSmall,
                    color: "#091543",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 11,
                    }}
                  >
                    Role:{" "}
                  </Text>
                  {project.role}
                </Text>
                <Text
                  style={{
                    ...styles.textSmall,
                    color: "#091543",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 11,
                    }}
                  >
                    Achievements:{" "}
                  </Text>
                  {project.achievements}
                </Text>

                {project.link && project.nda === 0 && (
                  <View>
                    <Text style={{ ...styles.textSmall, color: "#091543" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 11,
                        }}
                      >
                        Link:{" "}
                      </Text>
                      {project.link}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CV1;
