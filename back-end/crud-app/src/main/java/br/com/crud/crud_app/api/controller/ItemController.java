package br.com.crud.crud_app.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.crud.crud_app.domain.execption.EntidadeNaoEncontrada;
import br.com.crud.crud_app.domain.model.Item;
import br.com.crud.crud_app.domain.repository.ItemRepository;
import br.com.crud.crud_app.domain.service.CadastroItemService;

@RestController
@RequestMapping("api/items")
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private CadastroItemService cadastroItemService;

	@GetMapping
	public List<Item> listar(){
		return itemRepository.findAll();
	}
	
	@GetMapping("/{itemId}")
	public ResponseEntity<Item> buscar(@PathVariable Long itemId){
		Optional<Item> item = itemRepository.findById(itemId);
		
		if(item.isPresent()) {
			return ResponseEntity.ok().body(item.get());
		}
		return ResponseEntity.notFound().build();
		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Item adicionar(@RequestBody Item item) {
		
		return cadastroItemService.salvar(item);
	}
	
	@PutMapping("/{itemId}")
	public ResponseEntity<Item> atualizar(@PathVariable Long itemId, @RequestBody Item item){
		Optional<Item> itemAtual = itemRepository.findById(itemId);
		
		if(itemAtual.isPresent()) {
			BeanUtils.copyProperties(item, itemAtual.get(),"id");
			Item itemSave = cadastroItemService.salvar(itemAtual.get());
			return ResponseEntity.ok(itemSave);
		}
		return ResponseEntity.notFound().build();
		
		
	}
	@DeleteMapping("/{itemId}")
	public ResponseEntity<?> remover(@PathVariable Long itemId){
		try {
			cadastroItemService.excluir(itemId);
			return ResponseEntity.noContent().build();
		} catch (EntidadeNaoEncontrada e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}
