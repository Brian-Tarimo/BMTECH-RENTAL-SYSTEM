const [users, setUsers] =
useState([]);

const fetchUsers =
async () => {

  const res =
    await API.get(
      "/user-management/users"
    );

  setUsers(
    res.data
  );

};
<table className="w-full">

<thead>
<tr>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Status</th>

<th>Actions</th>

</tr>
</thead>

<tbody>

{users.map(user => (

<tr key={user._id}>

<td>{user.name}</td>

<td>{user.email}</td>

<td>{user.role}</td>

<td>{user.status}</td>

<td>

<button>
Suspend
</button>

<button>
Activate
</button>

</td>

</tr>

))}

</tbody>

</table>


const pendingTenants =
await Tenant.find({
  status: "Pending"
});

<div className="grid md:grid-cols-4 gap-6">

<Card>
Total Users
</Card>

<Card>
Pending Tenants
</Card>

<Card>
Caretakers
</Card>

<Card>
Accountants
</Card>

</div>