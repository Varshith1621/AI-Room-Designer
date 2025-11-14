import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Users=pgTable('users',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl').notNull(),
    credits:integer('credits').default(4)
})


export const AiGeneratedImage=pgTable('Ai_Generated_Image',{
    id:serial('id').primaryKey(),
    RoomType:varchar('room_type').notNull(),
    DesignType:varchar('design_type').notNull(),
    orgImage:varchar('orginal_image').notNull(),
    aiImage:varchar('AI_image').notNull(),
    userEmail:varchar('User_email')
})