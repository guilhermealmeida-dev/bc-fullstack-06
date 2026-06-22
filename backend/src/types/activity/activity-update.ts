import activityAddresse from "./activity-addresse";

type ActivityUpdate = {
    title?: string,
    description?: string,
    typeId?: string,
    address?: activityAddresse,
    image?: string,
    sheduledDate?: Date,
    private?: boolean,
    completedAt?: Date
};

export default ActivityUpdate;