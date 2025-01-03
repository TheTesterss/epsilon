import Self from '../classes/Self';
import Database from './Database';
import { LangTypes } from '../types/options';
import { InteractionsResolvable } from '../types/commands';
import { MessageCreateOptions } from 'discord.js';

export class Precondition {
    public unacceptanceFunction: (
        self: Self,
        db: Database,
        interaction: InteractionsResolvable,
        lang: LangTypes
    ) => MessageCreateOptions | Promise<MessageCreateOptions>;
    public name: string;
    public verifyCondition: (
        self: Self,
        db: Database,
        interaction: InteractionsResolvable,
        lang: LangTypes
    ) => boolean;

    constructor(
        name: string,
        unacceptanceFunction: (self: Self, db: Database, interaction: InteractionsResolvable, lang: LangTypes) => MessageCreateOptions | Promise<MessageCreateOptions>,
        verifyCondition: (self: Self, db: Database, interaction: InteractionsResolvable, lang: LangTypes) => boolean
    ) {
        this.verifyCondition = verifyCondition;
        this.unacceptanceFunction = unacceptanceFunction;
        this.name = name;
    }
}
