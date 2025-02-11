import axios from 'axios';
import {REACT_APP_SERVER_URI} from '@env';

export default class TeamRepository {
    async getTeam(token: string) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        try {
            return await api.get('v1/teams');
        } catch (e) {
            throw e;
        }
    }

    async createTeam(token: string, teamName: string, teamDescription: string) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        try {
            const response = await api.post('/v1/team', {
                name: teamName,
                description: teamDescription,
            });

            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async editTeam(
        token: string,
        teamName: string,
        teamDescription: string,
        teamId: string
    ) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        try {
            const response = await api.put(`/v1/team/${teamId}`, {
                name: teamName,
                description: teamDescription,
            });

            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteTeam(token: string, teamId: string) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        try {
            return await api.delete(`v1/team/${teamId}`);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async inviteMember(token: string, teamId: string, email: string) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        try {
            return await api.post('v1/team/invitation/email', {
                email: email,
                teamId: teamId,
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async deleteMember(token: string, teamId: string, members: string[]) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        try {
            const response = await api.post(`v1/team/${teamId}/delete`, {
                memberId: members,
            });

            return response.data;

        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async acceptInvitation(token: string, teamId: number, inviteState: number) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        try {
            const response = await api.post('v1/team/invitation/answer', {
                teamId: teamId,
                inviteState: inviteState,
            });

            return response.data;
        } catch (e) {
            console.log(e);
            throw (e);
        }

    }

    async createProject(token: string, teamId: string, name: string, description: string, managerId: number, memberIdList: number[]) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        try {
            const response = await api.post(`v1/team/${teamId}/project`, {
                name,
                description,
                managerId,
                memberIdList,
            });

            console.log(response);
            return response.data;
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }

    async getProjects(token: string, teamId: string) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        try {
            const response = await api.get(`v1/team/${teamId}/projects`);

            console.log(response);
            return response.data;
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }

    async changeStatus(token: string, taskId: string, taskState: number) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        try {
            const response = await api.patch(`v1/task/state/${taskId}`, {
                taskState
            });
    
            console.log(response);
            return response.data;
        } catch (e: any) {
            if (e.response && e.response.data) {
                console.log(e.response.data.reason); // reason 출력
            } else {
                console.log('Unexpected error:', e);
            }
            throw e;
        }
    }
    
    async createTask(token: string, projectId: string, taskData: any) {
        const formData = new FormData();
        
        formData.append('request', JSON.stringify(taskData.request));
        
        if (!taskData.images || taskData.images.length === 0) {
            formData.append('images', {
                uri: '',
                type: 'image/jpeg',
                name: 'empty_image.jpg'
            });
        } else {
            taskData.images.forEach((image: any, index: any) => {
                formData.append('images', {
                    uri: image,
                    type: 'image/jpeg',
                    name: `task_image_${index}.jpg`
                });
            });
        }
     
        const api = axios.create({
            baseURL: process.env.REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        
        try {
            const response = await api.post(`/v1/projects/${projectId}/tasks`, formData);
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Task creation error:', error.response.data);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async getTasks(token: string, teamId: string, projectId: string) {
        const api = axios.create({
            baseURL: REACT_APP_SERVER_URI,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        try {
            const response = await api.get(`/v1/team/${teamId}/project/${projectId}`);
            console.log(response);
            return response.data;
        } catch (e: any) {
            if (e.response && e.response.data) {
                console.log(e.response.data.reason);
            } else {
                console.log('Unexpected error:', e);
            }
            throw e;
        }
    }
}
