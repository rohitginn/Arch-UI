import { GlassDataTable, DataTableColumn } from '@archui/react';
import { GlassBadge } from '@archui/react';

// ============================================================================
// EXAMPLE 1: Basic Data Table with Sorting and Filtering
// ============================================================================

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    joinedAt: Date;
}

const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinedAt: new Date('2024-01-15') },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinedAt: new Date('2024-02-20') },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', joinedAt: new Date('2023-12-10') },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'active', joinedAt: new Date('2024-03-05') },
    // ... more data
];

export function BasicDataTableExample() {
    const columns: DataTableColumn<User>[] = [
        {
            field: 'name',
            header: 'Name',
            sortable: true,
            filterable: true,
            width: '200px',
        },
        {
            field: 'email',
            header: 'Email',
            sortable: true,
            filterable: true,
        },
        {
            field: 'role',
            header: 'Role',
            sortable: true,
            filterable: true,
            width: '120px',
        },
        {
            field: 'status',
            header: 'Status',
            sortable: true,
            width: '120px',
            render: (value: string) => (
                <GlassBadge variant={value === 'active' ? 'success' : 'secondary'}>
                    {value}
                </GlassBadge>
            ),
        },
        {
            field: 'joinedAt',
            header: 'Joined',
            sortable: true,
            width: '150px',
            render: (value: Date) => value.toLocaleDateString(),
            sortFn: (a, b) => a.joinedAt.getTime() - b.joinedAt.getTime(),
        },
    ];

    return (
        <GlassDataTable
            data={users}
            columns={columns}
            pagination={{ pageSize: 10 }}
            stickyHeader
            maxHeight="500px"
        />
    );
}

// ============================================================================
// EXAMPLE 2: Data Table with Row Selection
// ============================================================================

export function SelectableDataTableExample() {
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

    const columns: DataTableColumn<User>[] = [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'role', header: 'Role', sortable: true },
    ];

    return (
        <div className="space-y-4">
            <GlassDataTable
                data={users}
                columns={columns}
                selectable
                selectionMode="multiple"
                selectedRows={selectedRows}
                onSelectionChange={setSelectedRows}
                pagination={{ pageSize: 10 }}
            />

            {selectedRows.length > 0 && (
                <div className="text-sm text-text-primary/70">
                    Selected {selectedRows.length} row(s)
                </div>
            )}
        </div>
    );
}

// ============================================================================
// EXAMPLE 3: Expandable Rows
// ============================================================================

export function ExpandableDataTableExample() {
    const columns: DataTableColumn<User>[] = [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'email', header: 'Email' },
        { field: 'role', header: 'Role' },
    ];

    return (
        <GlassDataTable
            data={users}
            columns={columns}
            expandable
            renderExpandedRow={(user) => (
                <div className="space-y-2 p-4">
                    <h4 className="font-semibold text-text-primary">User Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-text-primary/60">Full Name:</span>
                            <span className="ml-2 text-text-primary">{user.name}</span>
                        </div>
                        <div>
                            <span className="text-text-primary/60">Email:</span>
                            <span className="ml-2 text-text-primary">{user.email}</span>
                        </div>
                        <div>
                            <span className="text-text-primary/60">Role:</span>
                            <span className="ml-2 text-text-primary">{user.role}</span>
                        </div>
                        <div>
                            <span className="text-text-primary/60">Status:</span>
                            <span className="ml-2 text-text-primary">{user.status}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-text-primary/60">Joined:</span>
                            <span className="ml-2 text-text-primary">
                                {user.joinedAt.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            pagination={{ pageSize: 5 }}
        />
    );
}

// ============================================================================
// EXAMPLE 4: Custom Cell Rendering with Actions
// ============================================================================

export function ActionsDataTableExample() {
    const handleEdit = (user: User) => {
        console.log('Edit user:', user);
    };

    const handleDelete = (user: User) => {
        console.log('Delete user:', user);
    };

    const columns: DataTableColumn<User>[] = [
        { field: 'name', header: 'Name', sortable: true, filterable: true },
        { field: 'email', header: 'Email', sortable: true, filterable: true },
        {
            field: 'role',
            header: 'Role',
            sortable: true,
            width: '120px',
        },
        {
            field: 'id',
            header: 'Actions',
            width: '150px',
            render: (_, user) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 text-xs rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(user)}
                        className="px-3 py-1 text-xs rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <GlassDataTable
            data={users}
            columns={columns}
            pagination={{ pageSize: 10 }}
        />
    );
}

// ============================================================================
// EXAMPLE 5: Loading State
// ============================================================================

export function LoadingDataTableExample() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<User[]>([]);

    React.useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setData(users);
            setLoading(false);
        }, 2000);
    }, []);

    const columns: DataTableColumn<User>[] = [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'email', header: 'Email' },
        { field: 'role', header: 'Role' },
    ];

    return (
        <GlassDataTable
            data={data}
            columns={columns}
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
    );
}

// ============================================================================
// EXAMPLE 6: Dense Table (Compact Mode)
// ============================================================================

export function DenseDataTableExample() {
    const columns: DataTableColumn<User>[] = [
        { field: 'name', header: 'Name', sortable: true, filterable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'role', header: 'Role', width: '100px' },
        { 
            field: 'status', 
            header: 'Status', 
            width: '100px',
            render: (value: string) => (
                <span className={cn(
                    'inline-block w-2 h-2 rounded-full',
                    value === 'active' ? 'bg-green-500' : 'bg-gray-400'
                )} />
            ),
        },
    ];

    return (
        <GlassDataTable
            data={users}
            columns={columns}
            density="compact"
            pagination={{ pageSize: 20 }}
        />
    );
}

// ============================================================================
// EXAMPLE 7: Empty State
// ============================================================================

export function EmptyDataTableExample() {
    const columns: DataTableColumn<User>[] = [
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'role', header: 'Role' },
    ];

    return (
        <GlassDataTable
            data={[]}
            columns={columns}
            emptyMessage="No users found. Add your first user to get started."
            pagination={false}
        />
    );
}

// ============================================================================
// EXAMPLE 8: All Features Combined
// ============================================================================

export function FullFeaturedDataTableExample() {
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

    const columns: DataTableColumn<User>[] = [
        {
            field: 'name',
            header: 'Name',
            sortable: true,
            filterable: true,
            width: '200px',
        },
        {
            field: 'email',
            header: 'Email',
            sortable: true,
            filterable: true,
        },
        {
            field: 'role',
            header: 'Role',
            sortable: true,
            filterable: true,
            width: '120px',
        },
        {
            field: 'status',
            header: 'Status',
            sortable: true,
            width: '120px',
            render: (value: string) => (
                <GlassBadge variant={value === 'active' ? 'success' : 'secondary'}>
                    {value}
                </GlassBadge>
            ),
        },
        {
            field: 'joinedAt',
            header: 'Joined',
            sortable: true,
            width: '150px',
            render: (value: Date) => value.toLocaleDateString(),
            sortFn: (a, b) => a.joinedAt.getTime() - b.joinedAt.getTime(),
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Users</h2>
                <div className="flex gap-2">
                    {selectedRows.length > 0 && (
                        <>
                            <button className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 text-sm transition-colors">
                                Export ({selectedRows.length})
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm transition-colors">
                                Delete ({selectedRows.length})
                            </button>
                        </>
                    )}
                    <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm transition-colors">
                        Add User
                    </button>
                </div>
            </div>

            <GlassDataTable
                data={users}
                columns={columns}
                selectable
                selectionMode="multiple"
                selectedRows={selectedRows}
                onSelectionChange={setSelectedRows}
                expandable
                renderExpandedRow={(user) => (
                    <div className="grid grid-cols-3 gap-4 p-4">
                        <div>
                            <div className="text-xs text-text-primary/60 mb-1">Account ID</div>
                            <div className="text-sm text-text-primary font-mono">{user.id}</div>
                        </div>
                        <div>
                            <div className="text-xs text-text-primary/60 mb-1">Department</div>
                            <div className="text-sm text-text-primary">Engineering</div>
                        </div>
                        <div>
                            <div className="text-xs text-text-primary/60 mb-1">Last Login</div>
                            <div className="text-sm text-text-primary">2 hours ago</div>
                        </div>
                    </div>
                )}
                pagination={{ 
                    pageSize: 10,
                    showPageSize: true,
                    pageSizeOptions: [5, 10, 20, 50]
                }}
                density="normal"
                stickyHeader
                maxHeight="600px"
            />
        </div>
    );
}
