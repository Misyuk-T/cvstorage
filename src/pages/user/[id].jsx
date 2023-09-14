import { useEffect, useState } from "react";
import Head from "next/head";
import { PDFViewer } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import { decodeFromBase64 } from "next/dist/build/webpack/loaders/utils";

import { Box } from "@chakra-ui/react";

import {
  getIntersectedProjects,
  getIntersectedTechnologies,
} from "@/helpers/getIntersectedData";
import { getUserById } from "@/actions/user";
import useTechnologiesStore from "@/store/technologiesStore";
import useProjectsStore from "@/store/projectsStore";

import CV1 from "@/components/CV/CV1";
import Loader from "@/components/Loader/Loader";

const UserPage = () => {
  const { technologies } = useTechnologiesStore();
  const { projects } = useProjectsStore();

  const [user, setUser] = useState();
  const router = useRouter();

  const { id } = router.query;
  const intersectedHardSkills = getIntersectedTechnologies(
    technologies,
    user?.hardSkills,
  );
  const intersectedExperienceSkills = getIntersectedTechnologies(
    technologies,
    user?.experienceSkills,
  );
  const intersectedSoftSkills = getIntersectedTechnologies(
    technologies,
    user?.softSkills,
  );
  const intersectedLanguages = getIntersectedTechnologies(
    technologies,
    user?.languages,
  );
  const intersectedProjects = getIntersectedProjects(
    projects,
    user?.projects,
    technologies,
  );

  const handleFetch = async (obfuscatedId) => {
    const encodedId = decodeFromBase64(obfuscatedId);
    await getUserById(encodedId).then((data) => setUser(data));
  };

  useEffect(() => {
    if (id) {
      handleFetch(id);
    }
  }, [id]);

  return (
    <Box>
      {user ? (
        user.isEnabled === 1 ? (
          <Box>
            <Head>
              <title>{user?.name || "CV Storage"}</title>
            </Head>
            <PDFViewer
              style={{
                height: "100vh",
                width: "100vw",
              }}
            >
              <CV1
                user={user}
                hardSkills={intersectedHardSkills}
                experienceSkills={intersectedExperienceSkills}
                softSkills={intersectedSoftSkills}
                languages={intersectedLanguages}
                projects={intersectedProjects}
              />
            </PDFViewer>
          </Box>
        ) : (
          <Box> This user is not active </Box>
        )
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default UserPage;
