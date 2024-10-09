import { Request, Response } from "express";
import { acceptWorkspaceInviteService, getWorkspaceMembersService, inviteMemberService, removeMemberService } from "../services/members.services";

export async function getTeamMembersController(req:Request, res:Response) {
    const service = await getWorkspaceMembersService(req.params.teamId);
    return res.status(200).json(service);
}

export async function inviteToTeamController(req:Request, res:Response) {
    await inviteMemberService(req.params.email, req.params.teamId);
    return res.status(204).send();
}

export async function acceptInviteController(req:Request, res:Response) {
    await acceptWorkspaceInviteService(req.params.teamId, res.locals.userId);
    return res.status(204).send();
}

export async function removeMemberController(req:Request, res:Response) {
    await removeMemberService(req.params.teamId, req.params.userId);
    return res.status(204).send();
}
