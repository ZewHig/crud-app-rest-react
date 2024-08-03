package br.com.crud.crud_app.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.crud.crud_app.domain.execption.EntidadeNaoEncontrada;
import br.com.crud.crud_app.domain.model.Item;
import br.com.crud.crud_app.domain.repository.ItemRepository;

@Service
public class CadastroItemService {
	@Autowired
	ItemRepository itemRepository;
	
	public Item salvar(Item item) {
		return itemRepository.save(item);
	}
	
	public void excluir(Long itemId) {
		try {
			itemRepository.deleteById(itemId);
		}catch (EmptyResultDataAccessException  e) {
			throw new EntidadeNaoEncontrada(
					String.format("Não existe um cadastro de Item com código %d", itemId));
		}
		
	}
}
