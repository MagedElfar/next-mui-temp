export const paths = {
    home: "/",
    auth: {
        login: "/auth/login",
    },
    dashboard: {
        index: "/dashboard",
        overview: "/dashboard/overview",
        users: {
            index: "/dashboard/users",
            new: "/dashboard/users/new",
            view: (id: string) => `/dashboard/users/${id}`,
            edit: (id: string) => `/dashboard/users/${id}/edit`,
            sessions: (id: string) => `/dashboard/users/${id}/sessions`,
            journey: (id: string) => `/dashboard/users/${id}/journey`,
            assessments: (id: string) => `/dashboard/users/${id}/assessments`,
            priorities: (id: string) => `/dashboard/users/${id}/priorities`,
            plans: (id: string) => `/dashboard/users/${id}/plans`,
            activity: (id: string) => `/dashboard/users/${id}/activity`,
            calendar: (id: string) => `/dashboard/users/${id}/calendar`,
            notifications: (id: string) => `/dashboard/users/${id}/notifications`,
            run: (id: string, runId: string) => runId ?
                `/dashboard/users/${id}/assessments?run=${runId}`
                : `/dashboard/users/${id}/assessments`,
            plan: (id: string, runId: string) => runId ?
                `/dashboard/users/${id}/plans?run=${runId}`
                : `/dashboard/users/${id}/plans`,
        },
        "goals": {
            index: "/dashboard/goals",
            view: (id: string) => `/dashboard/goals/${id}`,
            practices: (id: string) => `/dashboard/goals/${id}/practices`,
        },
        "assessments": {
            index: "/dashboard/assessments",
        },
        "subscriptions": {
            index: "/dashboard/subscriptions",
            plans: "/dashboard/subscriptions/plans",
            events: "/dashboard/subscriptions/events",
            view: (id: string) => `/dashboard/subscriptions/${id}`,
        },
        "notifications": {
            index: "/dashboard/notifications",
        },
        "support": {
            index: "/dashboard/support",
        },
        "teams": {
            index: "/dashboard/teams",
        },
        "reports": {
            index: "/dashboard/reports",
        },
        "audit": {
            index: "/dashboard/audit",
        },
        "settings": {
            index: "/dashboard/settings",
        }

    }
}
