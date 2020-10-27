const { Group } = require('ngcsgroups');


const initdb = async () => {
    return Group.findOne({ name: 'administrators' })
        .then(adminGroup => {
            if (!adminGroup) {
                const error = new Error('Administrators group not found');
                throw error;
            }
            return Group.findOne({ name: 'toolsManagers' })
                .then(toolsManager => {
                    if (!toolsManager) {
                        const toolsGroup = new Group({
                            name: 'toolsManagers'
                        })
                        return toolsGroup.save();
                    }
                    return toolsManager;
                })
                .then(toolsGroup => {
                    if (!toolsGroup.groups.includes(adminGroup._id.toString())) {
                        toolsGroup.groups.push(adminGroup._id.toString());
                        return toolsGroup.save();
                    }
                    return toolsGroup;
                })
        })
}


module.exports = initdb;