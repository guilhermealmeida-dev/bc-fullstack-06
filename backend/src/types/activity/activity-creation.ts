import activityAddresse from "./activity-addresse";

type ActivityCreation = {
    title: string,
    description: string,
    typeId: string,
    address: activityAddresse,
    confirmationCode: string,
    image: string,
    sheduledDate: Date,
    createdAt: Date,
    private: boolean,
    creatorId: string,
};

export default ActivityCreation;