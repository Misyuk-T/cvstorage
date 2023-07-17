import { getAllUsers } from "src/actions/user";

const UserList = ({ users }) => {
  console.log(users, "users");

  return (
    <div>
      <h1>User List</h1>
      {users?.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Position: {user.position}</p>
          {/* Render other user information */}
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const users = await getAllUsers();
    return { props: { users } };
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return { props: { error: error.message, users: [] } };
  }
}

export default UserList;
