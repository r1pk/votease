import Joi from 'joi';

export const CreateRoomFormSchema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(20).required().label('username'),
  poll: Joi.object({
    title: Joi.string().required().label('title'),
    choices: Joi.array().min(2).items(Joi.string().label('choice')).required().label('choices'),
  }),
});
