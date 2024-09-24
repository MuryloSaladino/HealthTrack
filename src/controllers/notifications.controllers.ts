import { Request, Response } from "express";
import { deleteNotificationService, getNotificationsService } from "../services/notifications.services";

export async function getNotificationsController(req:Request, res:Response) {
    const service = await getNotificationsService(res.locals.userId);
    return res.status(200).json(service);
}

export async function deleteNotificationController(req:Request, res:Response) {
    await deleteNotificationService(req.params.notificationId);
    return res.status(204).send();
}
