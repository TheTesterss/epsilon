import Self from '../../classes/Self';
import { Preconditions } from '../../types/preconditions';
import Database from '../Database';
import { Precondition } from '../Precondition';
import { LangTypes } from '../../types/options';
import { InteractionsResolvable } from '../../types/commands';
import { EmbedBuilder, MessageCreateOptions, TextChannel } from 'discord.js';
import { CommandColors } from '../../types/colors';
import { generateDeniedAccessFooter } from '../../utils/texts';

export default new Precondition(
    Preconditions.RESERVED_FOR_NSFW_CHANNELS,
    async (self: Self, db: Database, interaction: InteractionsResolvable, lang: LangTypes): Promise<MessageCreateOptions> => {
        const myEmbed = new EmbedBuilder().setColor(CommandColors.ERROR).setFooter(generateDeniedAccessFooter(self)[lang]);

        myEmbed
            .addFields({
                name: `📜 **${lang === 'fr' ? 'Comprendre pourquoi ?' : 'Understand why?'}**`,
                value: lang === "fr"
                    ? `\`\`\`diff\nCertaines commandes obligent des permissions comme celle de gérant du client pour diverses raisons:\n\n+ Accès à des données réservées.\n+ Accès à toutes les fonctionalités du client.\n+ Et bien plus encore.\`\`\``
                    : `\`\`\`diff\nCertains commands demands permissions such as client manager for multiples reasons:\n\n+ Access to reserved datas.\n+ Access to every client's functionalities.\n+ And much more.\`\`\``,
                inline: false
            })
            .setDescription(
                lang === "fr"
                    ? `## ${interaction.client.user.username} ne vous autorise pas à exécuter cette commande.`
                    : `## ${interaction.client.user.username} doesn't allows you to execute this command..`
            )

        return {
            embeds: [myEmbed]
        };
    },
    (self: Self, db: Database, interaction: InteractionsResolvable, lang: LangTypes): boolean => {
        return process.env.owner === interaction.user.id;
    }
);