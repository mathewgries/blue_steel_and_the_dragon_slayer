const weaponsData = {
    sling:
    {
        name: "Sling",
        icon: "sling-icon.png",
        attackDamage: 1,
        durability: 100,
        maxDurability: 100,
        staminaCost: 2,
        speed: 100,
        projectile: {
            icon: '',
            distance: 150,
            speed: 8,
            type: "stone",
        }
    },
    sword: [
        {
            name: "Wooden Sword",
            icon: "wooden_sword_icon.png",
            damage: 1,
            range: 30,
            isSelectable: true,
        },
        {
            name: "Iron Sword",
            icon: "iron_sword_icon.png",
            damage: 3,
            range: 35,
            isSelectable: false,
        },
        {
            name: "Blue Steel Sword",
            icon: "blue_steel_sword_icon.png",
            damage: 5,
            range: 40,
            isSelectable: false,

        },
    ],
    axe: [
        {
            name: "Wooden Axe",
            icon: "wooden_axe_icon.png",
            damage: 2,
            range: 30,
            isSelectable: true,
        },
        {
            name: "Iron Axe",
            icon: "iron_axe_icon.png",
            damage: 2,
            range: 30,
            isSelectable: false,
        },
        {
            name: "Steel Axe",
            icon: "steel_axe_icon.png",
            damage: 2,
            range: 30,
            isSelectable: false,
        },
    ],
    bow: [
        {
            name: "Wooden Bow",
            icon: "wooden_bow_icon.png",
            damage: 1,
            range: 30,
            isSelectable: true,
        },
        {
            name: "Small Bow",
            icon: "small_bow_icon.png",
            damage: 1,
            range: 30,
            isSelectable: false,
        },
        {
            name: "Small Bow",
            icon: "small_bow_icon.png",
            damage: 1,
            range: 30,
            isSelectable: false,
        }
    ],
    crossbow: [
        {
            name: "Wooden Crossbow",
            icon: "wooden_crossbow_icon.png",
            damage: 1,
            range: 30,
            isSelectable: true,
        },
        {
            name: "Iron Crossbow",
            icon: "iron_crossbow_icon.png",
            damage: 1,
            range: 30,
            isSelectable: false,
        },
        {
            name: "Steel Crossbow",
            icon: "steel_crossbow_icon.png",
            damage: 1,
            range: 30,
            isSelectable: false,
        },
    ],
    spear: [
        {
            name: "Wooden Spear",
            icon: "wooden_spear_icon.png",
            damage: 1,
            range: 30,
            isSelectable: true,
        },
        {
            name: "Iron Spear",
            icon: "iron_spear_icon.png",
            damage: 1,
            range: 30,
            isSelectable: false,
        },
        {
            name: "Steel Spear",
            icon: "steel_spear_icon.png",
            damage: 1,
            range: 30,
            isSelectable: false,
        },
    ],
    mace: [
        {
            name: "Wooden Mace",
            icon: "wooden_mace_icon.png",
            damage: 1,
            range: 30,
            isSelectable: true,
        },
        {
            name: "Iron Mace",
            icon: "iron_mace_icon.png",
            damage: 1,
            range: 30,
            isSelectable: false,
        },
        {
            name: "Steel Mace",
            icon: "steel_mace_icon.png",
            damage: 1,
            range: 30,
            isSelectable: false,
        },
    ],
}


export default weaponsData;

