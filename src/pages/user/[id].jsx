import { useEffect, useState } from "react";
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

const UserPage = () => {
  const { technologies } = useTechnologiesStore();
  const { projects } = useProjectsStore();

  const [user, setUser] = useState();
  const router = useRouter();

  const { id } = router.query;
  const intersectedTechnologies = getIntersectedTechnologies(
    technologies,
    user?.technologyStack,
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
      {user && (
        <PDFViewer
          style={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <CV1
            user={user}
            technologies={intersectedTechnologies}
            projects={intersectedProjects}
          />
        </PDFViewer>
      )}
    </Box>
  );
};

export default UserPage;
