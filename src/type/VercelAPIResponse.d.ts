interface VercelProject {
    alias: string,
    created: string | number,
    createdAt: string | number,
    deletedAt: null | string | number,
    deployment:{
        id: string,
        url: string
    },
    deploymentId: string,
    projectId: string,
    redirect: null | string,
    redirectStatusCode: null | number,
    uid: string,
    updatedAt: string | number
}

interface VercelResponse{
    aliases: VercelProject[],
    pagination:{
        count: number, next: null | any, prev: number
    }
}
