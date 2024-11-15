const { query } = require('express')
const prisma = require('../config/prisma')

exports.read = async (req, res) => {
    try {
        const product = await prisma.product.findMany({
            orderBy: {
                id: 'asc'
            }
        })
        res.send(product)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server function read Error' });
    }
}

exports.readID = async (req, res) => {
    try {
        const { id } = req.params
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!product) {
            return res.status(404).json({ message: 'Not id' })
        }
        res.send(product)
    } catch (err) {
        console.log(err);
        res.ststus(500).send({ message: 'Server function readID Error' })

    }
}

exports.create = async (req, res) => {
    try {
        const { name, discription, price, stock } = req.body
        console.log(name, discription, price, stock)
        const product = await prisma.product.create({
            data: {
                name: name,
                discription: discription,
                price: parseFloat(price),
                stock: parseFloat(stock)
            }
        })
        res.send('function create')
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server function Create Error' })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { name, discription, price, stock } = req.body
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const existingProduct = await prisma.product.findUnique({
            where: { id: Number(id) },
        })
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                name: name,
                discription: discription,
                price: parseFloat(price),
                stock: parseFloat(stock),
            },
        })
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server function Update Error' });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const deleteId = await prisma.product.findUnique({
            where: { id: Number(id) },
        })
        if (!deleteId) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
        res.send('Delete product Success')
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server function Delete Error' })
    }
}