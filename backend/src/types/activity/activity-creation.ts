import activityAddresse from "./activity-addresse";

type activityCreation = {
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
export default activityCreation;